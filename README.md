strapi on Cloud Run

## Command

### Development
```
docker-compose up
```

### Container image build & submit
```sh
gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/$IMAGE_NAME \
  --substitutions=_DB_USER=$DATABASE_USER,_DB_PASS=$DATABASE_PASSWORD
```

### Deploy
```sh
gcloud run deploy $CLOUD_RUN_NAME \
  --platform managed \
  --region $REGION \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
  --update-env-vars SECRET_NAME=projects/$PROJECT_NUMBER/secrets/$SECRET_NAME/versions/$SECRET_VERSION
  --add-cloudsql-instances $PROJECT_ID:$REGION:$SQL_INSTANCE_NAME \
  --allow-unauthenticated
```

### Get URL
```sh
gcloud run services describe $CLOUD_RUN_NAME \
  --platform managed \
  --region $REGION \
  --format "value(status.url)"
```
