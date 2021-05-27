import axios from "axios";

export default async (download_url, name) => {
  const response = await axios({
    url: download_url,
    method: "GET",
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
};
