// Filter API results to required information
const CrimeArray = (postArr) => {
  const newArr = [];

  for (let i = 0; i < postArr.length; i++) {
    newArr.push({
      id: postArr[i].id,
      type: postArr[i].category,
      pos: {
        latitude: parseFloat(postArr[i].location.latitude),
        longitude: parseFloat(postArr[i].location.longitude),
      },
    });
  }
  return newArr;
};

export default CrimeArray;
