module movie_addr::bookmyshow {
    use std::signer;
    use std::vector;
    use std::string::{Self, String};
    use aptos_token::token;

    /// Struct to store booking info
    struct Booking has key, store, copy, drop {
        movie: String,
        language: String,
        location: String,
        date: String,
        time: String,
        seats: vector<String>,
        seat_types: vector<String>,
        prices: vector<u64>,
    }

    /// Storage registry
    struct BookingRegistry has key {
        bookings: vector<Booking>,
    }

    /// Initialize registry for account
    public entry fun init_registry(account: &signer) {
        if (!exists<BookingRegistry>(signer::address_of(account))) {
            move_to(account, BookingRegistry { bookings: vector::empty<Booking>() });
        }
    }

    /// Initialize collection for the account (call this once per account)
    public entry fun init_collection(user: &signer) {
        let collection_name = string::utf8(b"BookMyShow Tickets");
        let collection_description = string::utf8(b"Movie ticket NFTs from BookMyShow");
        let collection_uri = string::utf8(b"https://example.com/collection.png");
        
        // Only create if it doesn't exist
        if (!token::check_collection_exists(signer::address_of(user), collection_name)) {
            let mutate_setting = vector::empty<bool>();
            vector::push_back(&mut mutate_setting, false);
            vector::push_back(&mut mutate_setting, false);
            vector::push_back(&mut mutate_setting, false);
            vector::push_back(&mut mutate_setting, false);
            vector::push_back(&mut mutate_setting, false);
            vector::push_back(&mut mutate_setting, false);

            token::create_collection_script(
                user,
                collection_name,
                collection_description,
                collection_uri,
                0,
                mutate_setting
            );
        };
    }

    /// Book tickets + mint NFT
    public entry fun book_and_mint(
        user: &signer,
        movie: String,
        language: String,
        location: String,
        date: String,
        time: String,
        seats: vector<String>,
        seat_types: vector<String>,
        prices: vector<u64>
    ) acquires BookingRegistry {
        // Initialize registry if it doesn't exist
        init_registry(user);
        
        let booking = Booking {
            movie,
            language,
            location,
            date,
            time,
            seats,
            seat_types,
            prices
        };

        // Add to registry
        let registry = borrow_global_mut<BookingRegistry>(signer::address_of(user));
        vector::push_back(&mut registry.bookings, booking);

        // Create collection first (if not exists)
        let collection_name = string::utf8(b"BookMyShow Tickets");
        let collection_description = string::utf8(b"Movie ticket NFTs from BookMyShow");
        let collection_uri = string::utf8(b"https://example.com/collection.png");
        
        let mutate_setting = vector::empty<bool>();
        vector::push_back(&mut mutate_setting, false); // description
        vector::push_back(&mut mutate_setting, false); // royalty
        vector::push_back(&mut mutate_setting, false); // uri
        vector::push_back(&mut mutate_setting, false); // token maximum
        vector::push_back(&mut mutate_setting, false); // token properties
        vector::push_back(&mut mutate_setting, false); // token property values

        // Only create collection if it doesn't exist
        if (!token::check_collection_exists(signer::address_of(user), collection_name)) {
            token::create_collection_script(
                user,
                collection_name,
                collection_description,
                collection_uri,
                0, // maximum supply (0 = unlimited)
                mutate_setting
            );
        };

        // Mint NFT ticket
        let token_name = string::utf8(b"Movie Ticket");
        let description = string::utf8(b"Your booked movie ticket as NFT");
        let uri = string::utf8(b"https://example.com/ticket.png");
        
        let empty_keys = vector::empty<String>();
        let empty_vals = vector::empty<vector<u8>>();
        let empty_types = vector::empty<String>();

        let royalty_payee = signer::address_of(user);
        let royalty_denom = 1u64;
        let royalty_num = 0u64;

        let token_mutate_setting = vector::empty<bool>();
        vector::push_back(&mut token_mutate_setting, false);
        vector::push_back(&mut token_mutate_setting, false);
        vector::push_back(&mut token_mutate_setting, false);
        vector::push_back(&mut token_mutate_setting, false);
        vector::push_back(&mut token_mutate_setting, false);
        vector::push_back(&mut token_mutate_setting, false);

        token::create_token_script(
            user,
            collection_name,
            token_name,
            description,
            1, // amount to mint
            0, // maximum (0 = unlimited)
            uri,
            royalty_payee,
            royalty_denom,
            royalty_num,
            token_mutate_setting,
            empty_keys,
            empty_vals,
            empty_types
        );
    }

    #[view]
    /// View function to get user's bookings
    public fun get_bookings(user_addr: address): vector<Booking> acquires BookingRegistry {
        if (exists<BookingRegistry>(user_addr)) {
            borrow_global<BookingRegistry>(user_addr).bookings
        } else {
            vector::empty<Booking>()
        }
    }

    #[view]
    /// View function to get booking count
    public fun get_booking_count(user_addr: address): u64 acquires BookingRegistry {
        if (exists<BookingRegistry>(user_addr)) {
            vector::length(&borrow_global<BookingRegistry>(user_addr).bookings)
        } else {
            0
        }
    }
}