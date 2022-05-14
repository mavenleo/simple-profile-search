export default function ({ $axios /* redirect */, ...rst }) {
  $axios.setBaseURL(process.env.API_BASE_URL)
}
