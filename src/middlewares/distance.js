import distanceCalc from 'geo-distance';


const isInRadius = (from, to, radius) => {
  const fromCords = { lat: from.latitude, lon: from.longitude };
  const toCords = { lat: to.latitude, lon: to.longitude };

  const distance = distanceCalc.between(fromCords, toCords);

  return distance.human_readable() < radius + 1;
};


export default {
  isInRadius
};
