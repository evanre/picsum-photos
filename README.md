Lorem Picsum
===========

Lorem Ipsum... but for photos.

Forked from  **[DMarby/picsum-photos](https://github.com/DMarby/picsum-photos)** and modified to make possible run it on local computer.

If You use picsum.photos a lot You might think that it would be great to run this service on local environment to avoid continuous downloads and pressure on this nice service and your internet traffic. This fork is intended to do it!

###Installation:
- clone this repo
- run `npm install` to download all necessary modules
- Do `run npm download` and wait (for a while) till it downloads all photos from unsplah.it
- Do `run npm start`.

That's it! Now You can access photos on this address: `localhost/200/200`

###Optional:
You can forward picsum.photos address to local host. Just add `127.0.0.1 picsum.photos` in hosts file. Now You can access photos like before: `picsum.photos/200/200`. After local development will be finished, You can upload it on external servers and pictures will be displayed as usual for all users.
**Warning**: Website picsum.photos won't work till you run the `server` task. If You want to access original picsum.photos, just comment forwarding in hosts file `#picsum.photos/200/200`.
