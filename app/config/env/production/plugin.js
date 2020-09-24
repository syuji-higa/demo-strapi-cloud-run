module.exports = ({ env }) => ({
  upload: {
    provider: 'google-cloud-storage',
    providerOptions: {
      bucketName: env('GCS_BUCKET_NAME'),
      baseUrl: 'https://storage.cloud.google.com/{bucket-name}',
      uniform: true,
    },
  },
});
