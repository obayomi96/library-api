import app from './app';
import config from './config';

const port = config.PORT;

app.listen(port, () => {
  console.log(`app is live at http://127.0.0.1:${port}`);
});
