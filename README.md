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
    -k, --key [key]                    optional aws key access id
    -s, --secret [secret]              optional aws secret access key
    -b, --bucket <name>                bucket name
    -q, --quiet                        quiet mode
    -r, --region <name>                region if not in US standard
    -c, --cachecontrol <stringvalue>   cache control aws putObject param
    -i, --invalidate                   after upload find first cloudfront distribution which has an alias similar to the bucket name and invalidates its content
```

 Example
The content of `website_dir` will be uploaded to the S3 bucket named `website`.
If the upload is successful and a distribution containing an alias `website` is found, the whole distribution will be invalidated.

Keys can be passed with `-k`/`-s`, or omitted so the AWS SDK default credential chain is used (`AWS_PROFILE`, `AWS_SHARED_CREDENTIALS_FILE`, etc). `--invalidate` still requires `-k`/`-s`.
```
cd website_dir;
s3front -b website -r eu-west-1;
```

#LICENSE
MIT
