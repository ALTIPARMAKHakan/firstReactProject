import { createClient } from 'pexels'

export function pexelsFetchVideoURL (id) {
  const client = createClient('563492ad6f917000010000013a0119d67a4946bbb03a44b1979ee4db')
  client.videos.show({ id })
    .then(video => video.video_files.map(x => console.log(x.link)))
}
