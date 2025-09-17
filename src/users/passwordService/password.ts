import * as bcrypt from 'bcrypt';

async function hash(password: string) {
  const rounds = getNumbersOfRounds();
  return await bcrypt.hash(password, rounds);
}

function getNumbersOfRounds() {
  return process.env.NODE_ENV === 'production' ? 14 : 1;
}

async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

const password = {
  hash,
  compare,
};

export default password;
