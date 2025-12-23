export default function useBookStats(books) {
  return {
    owned: books.filter(b => b.status === "owned").length,
    reading: books.filter(b => b.status === "reading").length,
    wishlist: books.filter(b => b.status === "wishlist").length,
  };
}
