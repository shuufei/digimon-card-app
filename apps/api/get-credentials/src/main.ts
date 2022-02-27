import { execSync } from 'child_process';

type Body = {
  credentials: string;
};

const handler = async () => {
  const stdout = execSync(`sh ${__dirname}/assets/scripts/sign.sh`);
  const credentials = stdout.toString();
  const body: Body = {
    credentials,
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  console.info('credentials: ', credentials);
  console.info('response: ', response);
  return response;
};

handler();
