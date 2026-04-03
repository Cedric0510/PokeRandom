export const DEFAULT_POKEMON_BATCH_SIZE = 5;

function pickUniqueRandomIds(idsPool, count) {
  const pool = [...idsPool];
  const pickedIds = [];

  for (let i = 0; i < count; i += 1) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const [pickedId] = pool.splice(randomIndex, 1);
    pickedIds.push(pickedId);
  }

  return pickedIds;
}

function normalizeExcludedIds(excludedIds, totalCount) {
  if (!Array.isArray(excludedIds)) {
    return [];
  }

  return excludedIds.filter(
    (id) => Number.isInteger(id) && id >= 1 && id <= totalCount
  );
}

export function generateRandomPokemonIds(
  totalCount,
  excludedIds = [],
  batchSize = DEFAULT_POKEMON_BATCH_SIZE
) {
  if (!Number.isInteger(totalCount) || totalCount < 1) {
    return [];
  }

  const finalBatchSize = Math.min(Math.max(batchSize, 0), totalCount);
  const excludedSet = new Set(normalizeExcludedIds(excludedIds, totalCount));
  const availableIds = [];

  for (let id = 1; id <= totalCount; id += 1) {
    if (!excludedSet.has(id)) {
      availableIds.push(id);
    }
  }

  if (availableIds.length >= finalBatchSize) {
    return pickUniqueRandomIds(availableIds, finalBatchSize);
  }

  // Fallback: if total is too small to exclude all previous ids.
  const allIds = [];
  for (let id = 1; id <= totalCount; id += 1) {
    allIds.push(id);
  }

  return pickUniqueRandomIds(allIds, finalBatchSize);
}
