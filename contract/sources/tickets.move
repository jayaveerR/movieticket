module tickets_addr::mougli_tickets {
    use std::signer;
    use std::string;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::aptos_token;

    /// Error codes
    const E_SHOW_ALREADY_EXISTS: u64 = 1;

    /// Resource for single movie show
    struct Show has key {
        organizer: address,   // PVR organizer / mee wallet
        price: u64,           // price per ticket
        movie: string::String,
        theatre: string::String,
        time: string::String,
    }

    /// Initialize Mougli show (only once by owner)
    public entry fun init_show(organizer: &signer, price: u64) {
        let organizer_addr = signer::address_of(organizer);

        if (exists<Show>(organizer_addr)) {
            abort E_SHOW_ALREADY_EXISTS;
        };

        move_to(organizer, Show {
            organizer: organizer_addr,
            price,
            movie: string::utf8("Mougli"),
            theatre: string::utf8("PVR: Ripples, Vijayawada"),
            time: string::utf8("01:40 PM"),
        });
    }

    /// Buyer books ticket → sends payment + gets NFT
    public entry fun book_ticket(buyer: &signer, organizer: address, seat: u64) acquires Show {
        let show = borrow_global<Show>(organizer);

        // 1. Transfer payment
        coin::transfer<AptosCoin>(buyer, show.organizer, show.price);

        // 2. Mint NFT ticket
        let _ticket = aptos_token::mint(
            buyer,
            string::utf8("Mougli Movie Tickets"),                 // Collection
            string::utf8(&u64::to_string(seat)),                  // Ticket ID
            string::utf8("Mougli Ticket for ") + &show.theatre,   // Description
            string::utf8("https://ipfs.io/ipfs/..."),             // Poster/QR
            vector::empty<string::String>(),
            vector::empty<vector<u8>>(),
            vector::empty<string::String>()
        );
    }

    /// View ticket price
    #[view]
    public fun get_price(organizer: address): u64 acquires Show {
        borrow_global<Show>(organizer).price
    }

    /// View movie info
    #[view]
    public fun get_show_details(organizer: address): (string::String, string::String, string::String) acquires Show {
        let show = borrow_global<Show>(organizer);
        (show.movie, show.theatre, show.time)
    }
}
