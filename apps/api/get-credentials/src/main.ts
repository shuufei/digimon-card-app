import { execSync } from 'child_process';

type Body = {
  credentials: string;
};

export const handler = async () => {
  const stdout = execSync(`sh ${__dirname}/assets/scripts/sign.sh`);
  const credentials = stdout.toString();
  const body: Body = {
    // NOTE: 改行コードを削除
    credentials: credentials.replace(/\r?\n/g, ''),
  };
  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  console.info('credentials: ', credentials);
  console.info('response: ', response);
  return response;
};

// handler();
