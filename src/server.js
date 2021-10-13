import app from './app';

import variables from './configs/variables';

const port = variables.PORT;

app.listen(port, () => {
  console.log(`live at http://127.0.0.1:${port}`);
});
