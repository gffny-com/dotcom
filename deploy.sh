echo "Deploying to $BUCKET_NAME"

if [ $# = 2 ]
then

echo "Using profile $2"

aws s3 sync --acl public-read ./static s3://$BUCKET_NAME $1 $2

else

echo "Using profile defined aws configs"
aws s3 sync --acl public-read ./static s3://$BUCKET_NAME

fi