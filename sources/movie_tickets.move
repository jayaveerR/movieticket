module movie_addr::movie_tickets {
    use std::string;
    use std::vector;
    use std::signer;
    use std::option::{Self, Option};
    use std::error;

    use aptos_framework::account;
    use aptos_framework::coin;
    use aptos_framework::object;
    use aptos_framework::resource_account;
    use aptos_framework::event;
    use aptos_framework::string_utils;

    use aptos_token_objects::collection;
    use aptos_token_objects::token;

    // ========== CONSTANTS ==========

    const E_THEATER_ALREADY_INITIALIZED: u64 = 1;
    const E_THEATER_NOT_INITIALIZED: u64 = 2;
    const E_SEAT_ALREADY_BOOKED: u64 = 3;
    const E_INVALID_SEAT_ID: u64 = 4;

    const COLLECTION_NAME: vector<u8> = b"Movie Tickets";
    const COLLECTION_DESCRIPTION: vector<u8> = b"NFT tickets for movie screenings.";
    const COLLECTION_URI: vector<u8> = b"https://yourdapp.com/collection_uri";
    const TICKET_URI: vector<u8> = b"https://yourdapp.com/ticket_uri/";

    // ========== STRUCTS ==========

    struct Seat has store, key {
        id: u64,
        is_booked: bool,
        booked_by: Option<address>,
    }

    struct Theater has key {
        seats: vector<Seat>,
        owner: address,
        collection: object::Object<collection::Collection>,
        resource_signer_cap: resource_account::SignerCapability,
    }

    struct TicketBookedEvent has drop, store {
        seat_id: u64,
        buyer: address,
        price: u64,
        ticket_nft_addr: address,
    }

    // ========== PUBLIC ENTRY FUNCTIONS ==========

    public entry fun init_theater(owner: &signer, total_seats: u64) {
        let owner_addr = signer::address_of(owner);
        assert!(!exists<Theater>(owner_addr), error::already_exists(E_THEATER_ALREADY_INITIALIZED));

        let (resource_signer, resource_signer_cap) = resource_account::create_with_capability(owner, b"ticket_minter");

        let collection = collection::create(
            &resource_signer,
            string::utf8(COLLECTION_DESCRIPTION),
            string::utf8(COLLECTION_NAME),
            string::utf8(COLLECTION_URI),
            0, // max supply
            (false, false, false), // mutability config
        );

        let seats = vector::empty<Seat>();
        let i = 0;
        while (i < total_seats) {
            vector::push_back(&mut seats, Seat {
                id: i,
                is_booked: false,
                booked_by: option::none(),
            });
            i = i + 1;
        };

        move_to(owner, Theater {
            seats,
            owner: owner_addr,
            collection,
            resource_signer_cap,
        });
    }

    public entry fun book_ticket(buyer: &signer, seat_id: u64, price: u64) acquires Theater {
        let theater = borrow_global_mut<Theater>(@movie_addr);
        assert!(seat_id < vector::length(&theater.seats), error::invalid_argument(E_INVALID_SEAT_ID));

        let seat = vector::borrow_mut(&mut theater.seats, seat_id);
        assert!(!seat.is_booked, error::already_exists(E_SEAT_ALREADY_BOOKED));

        coin::transfer<aptos_framework::aptos_coin::AptosCoin>(buyer, theater.owner, price);

        let buyer_addr = signer::address_of(buyer);
        seat.is_booked = true;
        seat.booked_by = option::some(buyer_addr);

        let resource_signer = account::create_signer_with_capability(&theater.resource_signer_cap);

        let token_name = string::utf8(b"Ticket #");

        let ticket_nft = token::mint(
            &resource_signer,
            theater.collection,
            string::utf8(b"Your personal movie ticket."),
            token_name,
            string::utf8(TICKET_URI),
            (false, false, false, false, false), // property mutability
        );

        object::transfer(ticket_nft, buyer_addr);

        event::emit(TicketBookedEvent {
            seat_id,
            buyer: buyer_addr,
            price,
            ticket_nft_addr: object::object_address(&ticket_nft),
        });
    }

    // ========== PUBLIC VIEW FUNCTION ==========

    public fun is_seat_booked(seat_id: u64): bool acquires Theater {
        let theater = borrow_global<Theater>(@movie_addr);
        assert!(seat_id < vector::length(&theater.seats), error::invalid_argument(E_INVALID_SEAT_ID));
        let seat = vector::borrow(&theater.seats, seat_id);
        seat.is_booked
    }
}