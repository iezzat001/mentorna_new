#!/usr/bin/env bash
#
# Upload a community webinar recording (and optional poster) to the S3 bucket
# that backs the CloudFront distribution used by the site.
#
# The web app resolves webinar media from:
#   https://d2mp3ttz3u5gci.cloudfront.net/webinars/<file>
# ...which maps to the S3 key `webinars/<file>` in the bucket below.
#
# Prerequisites:
#   - AWS CLI v2 installed and configured, OR the following env vars set:
#       AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
#   - The S3 bucket name in WEBINAR_S3_BUCKET (or edit the default below).
#
# Usage:
#   scripts/upload-webinar-to-s3.sh <local-video.mp4> <remote-name.mp4> [poster.jpg]
#
# Example:
#   scripts/upload-webinar-to-s3.sh ./webinar1.mp4 2026-08-21-community-webinar.mp4 ./poster.jpg
#
set -euo pipefail

WEBINAR_S3_BUCKET="${WEBINAR_S3_BUCKET:-REPLACE_WITH_YOUR_BUCKET}"
WEBINAR_S3_PREFIX="${WEBINAR_S3_PREFIX:-webinars}"
CLOUDFRONT_BASE="${CLOUDFRONT_BASE:-https://d2mp3ttz3u5gci.cloudfront.net}"

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <local-video> <remote-name.mp4> [local-poster]" >&2
  exit 1
fi

if [[ "${WEBINAR_S3_BUCKET}" == "REPLACE_WITH_YOUR_BUCKET" ]]; then
  echo "ERROR: Set WEBINAR_S3_BUCKET to your S3 bucket name (env var or edit this script)." >&2
  exit 1
fi

LOCAL_VIDEO="$1"
REMOTE_NAME="$2"
LOCAL_POSTER="${3:-}"

if ! command -v aws >/dev/null 2>&1; then
  echo "ERROR: aws CLI not found. Install AWS CLI v2 first." >&2
  exit 1
fi

echo "Uploading video -> s3://${WEBINAR_S3_BUCKET}/${WEBINAR_S3_PREFIX}/${REMOTE_NAME}"
aws s3 cp "${LOCAL_VIDEO}" "s3://${WEBINAR_S3_BUCKET}/${WEBINAR_S3_PREFIX}/${REMOTE_NAME}" \
  --content-type "video/mp4" \
  --cache-control "public, max-age=31536000, immutable"

if [[ -n "${LOCAL_POSTER}" ]]; then
  POSTER_NAME="${REMOTE_NAME%.*}.jpg"
  echo "Uploading poster -> s3://${WEBINAR_S3_BUCKET}/${WEBINAR_S3_PREFIX}/${POSTER_NAME}"
  aws s3 cp "${LOCAL_POSTER}" "s3://${WEBINAR_S3_BUCKET}/${WEBINAR_S3_PREFIX}/${POSTER_NAME}" \
    --content-type "image/jpeg" \
    --cache-control "public, max-age=31536000, immutable"
fi

echo ""
echo "Done. Public URL:"
echo "  ${CLOUDFRONT_BASE}/${WEBINAR_S3_PREFIX}/${REMOTE_NAME}"
echo ""
echo "Reference it in src/data/webinars.ts as videoFile: \"${REMOTE_NAME}\""
