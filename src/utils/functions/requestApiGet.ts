import { apiUrlBase } from "utils/constants";

type TRequestApiGet = (args: {
  apiUrl: string;
  handleSuccess: (data?: any) => void;
  handleError: (error: Error) => void;
  handleFinally: () => void;
}) => void;

const requestApiGet: TRequestApiGet = ({
  apiUrl,
  handleSuccess,
  handleError,
  handleFinally = () => {},
}) => {
  fetch(`${apiUrlBase}/${apiUrl}`)
    .then((response) => response.json())
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinally);
};

export default requestApiGet;
