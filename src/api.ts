import axios from "axios";

export const fetchRepoData = (): Promise<{ name: string }> =>
  axios
    .get('https://api.github.com/repos/tannerlinsley/react-query')
    .then((response) => response.data)
