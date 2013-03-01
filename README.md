S3Front
=======
Fast command-line tool to upload a directory to an AWS S3 bucket and optionally invalidate the associated AWS CloudFront distribution.

By default all uploaded files will be public.

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
```
cd website_dir;
# The content of website_dir will be uploaded to the S3 bucket named website.
# If the upload is successful and a distribution containing an alias website is found, the whole distribution will be invalidated.
s3front -k xxx -s xxx -b website -l;
```

#LICENSE

MIT

# TODO
Cloudfront invalidation
