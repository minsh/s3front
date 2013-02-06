S3Front
=======
Command-line tool to upload a directory to an AWS S3 bucket and optionally invalidate the associated AWS CloudFront distribution.

By default all uploaded files will be public.

# Install
```
npm install s3front -g
```

# Usage
```
cp website;
s3front -k xxx -s xxx -b bucket_name; 
```


# TODO
Cloudfront invalidation
