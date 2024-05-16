import ReviewCard from "./ReviewCard"
const ListReviewCards = ({ reviews }) => {
    return (
        <ul className="flex flex-wrap justify-start gap-4 my-10">
            {reviews.length > 0 &&
                reviews.map((review) => (
                    <li key={review.id}>
                        <ReviewCard review={review} />
                    </li>
                ))}
        </ul>
    )
}
export default ListReviewCards
