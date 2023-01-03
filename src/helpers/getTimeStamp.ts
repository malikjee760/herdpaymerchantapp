/**
 * @name getUnixTimestamp
 * Gets current unix timestamp in seconds
 *
 * @returns Timestamp - Time in seconds
 * @internal
 */
const getUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

export { getUnixTimestamp };
