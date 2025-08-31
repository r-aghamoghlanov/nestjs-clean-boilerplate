export const TestHello = (message: string) => {
  console.log(`${'TestHello - ' + new Date().toISOString() + ': ' + message}`);
};

export default TestHello;
