export const sendVerificationAccount = async (data: any) => {
  fetch('/api/v1/activate', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
