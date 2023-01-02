import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'q4qf7bhb',
    dataset: 'production',
    apiVersion: '2022-12-28',
    useCdn: true,
    token: 'skzyO1hHh4XVlqBYVMvc4qWnwpNyyBENCfJp14kgEA4UKVrO3TT5VqeFuzTx7IThbGxaTiaxgRKzP2yI9utsqHRdZVM0pjhMlSj8vxOlqbLIZc0snh5RpWvHLQdRJIDqbpYRzkWgIA23pdDHytcoJOTkXdZtVXCFHTIKiXIjrc3bwrlGHaYm',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);