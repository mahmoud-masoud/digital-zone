const randomUsername = () => {
  // Generate a random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return "user_" + randomNumber;
};

export default randomUsername;
