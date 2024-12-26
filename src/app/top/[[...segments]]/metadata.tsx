export async function generateMetadata({
  params,
}: {
  params: { segments?: string[] };
}) {
  const [type, filter] = params.segments || [];

  let title = "Top Anime";
  switch (type) {
    case "movie":
      title = "Top Movies";
      break;
    case "tv":
      switch (filter) {
        case "airing":
          title = "Top Airing TV Shows";
          break;
        case "bypopularity":
          title = "Most Popular TV Shows";
          break;
        case "favorite":
          title = "Most Favorite TV Shows";
          break;
        default:
          title = "Top TV Shows";
      }
      break;
  }

  return {
    title,
    description: `Browse ${title} from our anime collection.`,
  };
}
