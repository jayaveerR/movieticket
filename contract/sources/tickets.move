module tickets_addr::mougli_tickets {
    use std::signer;
    use std::string;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_token::token;

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
            abort E_SHOW_ALREADY_EXISTS
        };

        move_to(organizer, Show {
            organizer: organizer_addr,
            price,
            movie: string::utf8(b"Mougli"),
            theatre: string::utf8(b"PVR: Ripples, Vijayawada"),
            time: string::utf8(b"01:40 PM"),
        });
    }

    /// Buyer books ticket → sends payment + gets NFT
    public entry fun book_ticket(buyer: &signer, organizer: address, seat: u64) acquires Show {
        let show = borrow_global<Show>(organizer);

        // 1. Transfer payment
        coin::transfer<AptosCoin>(buyer, show.organizer, show.price);

        // 2. Create collection if it doesn't exist
        let collection_name = string::utf8(b"Mougli Movie Tickets");
        let collection_description = string::utf8(b"Movie tickets for Mougli");
        let collection_uri = string::utf8(b"https://ipfs.io/ipfs/mougli-collection");
        
        if (!token::check_collection_exists(signer::address_of(buyer), collection_name)) {
            token::create_collection(
                buyer,
                collection_name,
                collection_description,
                collection_uri,
                0, // maximum supply (0 = unlimited)
                vector<bool>[false, false, false] // mutability settings
            );
        };

        // 3. Mint NFT ticket
        let seat_string = u64_to_string(seat);
        let token_name = string::utf8(b"Seat ") + seat_string;
        let token_description = string::utf8(b"Mougli Ticket for ") + show.theatre;
        let token_uri = string::utf8(b"https://ipfs.io/ipfs/mougli-ticket");

        token::create_token(
            buyer,
            collection_name,
            token_name,
            token_description,
            1, // balance
            token_uri,
            signer::address_of(buyer), // royalty payee
            0, // royalty points denominator
            0, // royalty points numerator
            vector<bool>[false, false, false, false, false], // token mutability
            vector<string::String>[], // property keys
            vector<vector<u8>>[], // property values
            vector<string::String>[] // property types
        );
    }

    /// Helper function to convert u64 to string
    fun u64_to_string(num: u64): string::String {
        if (num == 0) {
            return string::utf8(b"0")
        };
        
        let digits = vector::empty<u8>();
        let temp = num;
        
        while (temp > 0) {
            let digit = ((temp % 10) as u8) + 48; // Convert to ASCII
            vector::push_back(&mut digits, digit);
            temp = temp / 10;
        };
        
        vector::reverse(&mut digits);
        string::utf8(digits)
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