export function calculateRelevance(post: {
  viewCount: number;
  likesCount: number;
  sharesCount: number;
  isEditorsPick: boolean;
}) {
  // Define weights for different factors (adjust as needed)
  const viewCountWeight = 0.4;
  const likesCountWeight = 0.3;
  const sharesCountWeight = 0.2;
  const isEditorsPickWeight = 0.1;

  // Extract relevant data from the post
  const { viewCount, likesCount, sharesCount, isEditorsPick } = post;

  // Calculate the relevance score based on the factors and weights
  const relevanceScore =
    viewCount * viewCountWeight +
    likesCount * likesCountWeight +
    sharesCount * sharesCountWeight +
    (isEditorsPick ? 1 : 0) * isEditorsPickWeight;

  return relevanceScore;
}
