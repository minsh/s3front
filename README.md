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

    -h, --help                         output usage information
    -V, --version                      output the version number
    -k, --key <key>                    aws key access id (omit these flags to use AWS_PROFILE / the default credential chain)
    -s, --secret <secret>              aws secret access key (omit these flags to use AWS_PROFILE / the default credential chain)
    -b, --bucket <name>                bucket name
    -q, --quiet                        quiet mode
    -r, --region <name>                region if not in US standard (or AWS_REGION)
    -c, --cachecontrol <stringvalue>   cache control aws putObject param
    -i, --invalidate                   after upload find first cloudfront distribution which has an alias similar to the bucket name and invalidates its content

  Environment (used when -k/-s are omitted):

    AWS_PROFILE                   named profile (e.g. web-deploy)
    AWS_SHARED_CREDENTIALS_FILE   credentials file path
    AWS_SDK_LOAD_CONFIG           set to 1 so aws-sdk v2 honors AWS_SHARED_CREDENTIALS_FILE
    AWS_REGION                    used if -r is omitted
```

 Example
The content of `website_dir` will be uploaded to the S3 bucket named `website`.
If the upload is successful and a distribution containing an alias `website` is found, the whole distribution will be invalidated.

Keys can still be passed with `-k`/`-s`. If they are omitted, the AWS SDK default credential chain is used (`AWS_PROFILE`, `AWS_SHARED_CREDENTIALS_FILE`, etc). `--invalidate` still requires `-k`/`-s`.
```
cd website_dir;
s3front -k xxx -s xxx -b website;
# or, with AWS_PROFILE / AWS_SHARED_CREDENTIALS_FILE set:
s3front -b website -r eu-west-1;
```

#LICENSE
MIT
