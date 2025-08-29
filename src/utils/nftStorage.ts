import { NFTStorage, File } from "nft.storage";

export const nftClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!, // NEXT_PUBLIC_ ante frontend lo use cheyachu
});

export async function uploadTicketMetadata(movie, theater, seat, showtime, imageFile: File) {
  const metadata = await nftClient.store({
    name: `Ticket - ${movie}`,
    description: `Seat ${seat} for ${movie} at ${theater} (${showtime})`,
    image: imageFile,
    attributes: [
      { trait_type: "Movie", value: movie },
      { trait_type: "Seat", value: seat },
      { trait_type: "Theater", value: theater },
      { trait_type: "ShowTime", value: showtime },
    ],
  });

  return metadata.url; // ipfs://... link
}
