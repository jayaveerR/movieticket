module movie_addr::movie_ticketing {
    use std::signer;
    use std::vector;
    use std::string;
    use aptos_token::token;

    /// Helper: create a vector<bool> for mutate settings (all false = immutable)
    fun empty_mutate_setting(): vector<bool> {
        let v = vector::empty<bool>();
        vector::push_back(&mut v, false);
        vector::push_back(&mut v, false);
        vector::push_back(&mut v, false);
        vector::push_back(&mut v, false);
        vector::push_back(&mut v, false);
        vector::push_back(&mut v, false);
        v
    }

    /// Entry function: book a ticket + mint NFT
    public entry fun book_and_mint(
        user: &signer,
        collection_name: string::String,
        collection_description: string::String,
        collection_uri: string::String,
        token_name: string::String,
        token_description: string::String,
        token_uri: string::String,
        initial_supply: u64
    ) {
        let mutate_setting = empty_mutate_setting();

        // Create collection if it doesn't exist
        token::create_collection_script(
            user,
            collection_name,
            collection_description,
            collection_uri,
            0, // maximum = 0 => untracked
            mutate_setting
        );

        let empty_keys = vector::empty<string::String>();
        let empty_vals = vector::empty<vector<u8>>();
        let empty_types = vector::empty<string::String>();

        let royalty_payee = signer::address_of(user);
        let royalty_denom = 1u64;
        let royalty_num = 0u64;

        let token_mutate_setting = empty_mutate_setting();

        // Create token (NFT) and mint to user
        token::create_token_script(
            user,
            collection_name,
            token_name,
            token_description,
            initial_supply,
            0, // maximum = 0 => untracked
            token_uri,
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
    /// View function to check if a collection exists
    public fun collection_exists(creator: address, collection_name: string::String): bool {
        token::check_collection_exists(creator, collection_name)
    }

    #[view]
    /// View function to get token balance
    public fun get_token_balance(
        owner: address,
        creator: address,
        collection_name: string::String,
        token_name: string::String,
        property_version: u64
    ): u64 {
        let token_id = token::create_token_id_raw(
            creator,
            collection_name,
            token_name,
            property_version
        );
        token::balance_of(owner, token_id)
    }
}