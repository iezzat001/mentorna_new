import { Navigate, useParams } from 'react-router-dom';
import { HUB_PATH, getEpisodeByNumber } from '@/data/series';

/**
 * Numbered shortcut for episodes: /ep/2 -> /one-feature
 *
 * Lets future reels use short, predictable links without changing the
 * descriptive slugs that are already published on Instagram. Unknown or
 * unreleased numbers fall back to the series hub rather than a 404.
 */
const EpisodeRedirect = () => {
  const { n } = useParams<{ n: string }>();
  const episode = getEpisodeByNumber(Number(n));
  return <Navigate to={episode ? `/${episode.slug}` : HUB_PATH} replace />;
};

export default EpisodeRedirect;
