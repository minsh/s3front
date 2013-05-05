S3Front
=======
Fast command-line tool to upload a directory to an AWS S3 bucket and optionally invalidate the associated AWS CloudFront distribution. By default all uploaded files will be public. Per bucket caching is done in local `.s3front.json` file to avoid uploading the same file.

# Install
```
npm install s3front -g
```

# Usage
```
  Usage: s3front [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -k, --key <key>        aws key access id
    -s, --secret <secret>  aws secret access key
    -b, --bucket <name>    bucket name
    -q, --quiet            quiet mode
    -i, --invalidate       after upload find first cloudfront distribution which has an alias similar to the bucket name and invalidates its content
```

# Example
The content of `website_dir` will be uploaded to the S3 bucket named `website`.
If the upload is successful and a distribution containing an alias `website` is found, the whole distribution will be invalidated.
```
cd website_dir;
s3front -k xxx -s xxx -b website -l;
```

#LICENSE
MIT
