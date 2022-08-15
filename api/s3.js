require("dotenv").config();
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const path = require('path')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const ext = path.extname(file.originalname).toLowerCase();
    //console.log(ext);
    let fileType = "";

    if (ext == ".png") {
        fileType = "image/png";
    } else if (ext == ".jpg" || ext == ".jpeg") {
        fileType = "image/jpg";
    } else {
        res.send({ data: "error" });
    }

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        ContentType: fileType
    }

    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile

function getFileStream(fileKey) {
    /*const donwloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(donwloadParams).createReadStream()*/
    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: fileKey,
        Expires: 100000
    })

    return url;
}

exports.getFileStream = getFileStream

async function deleteImagen(key) {
    try {
        const bucketParams = { Bucket: bucketName, Key: key };
        const data = s3.deleteObject(bucketParams).promise();
        return 'exito';
    } catch (err) {
        console.log("Error", err);
        return 'error';
    }
};

exports.deleteImagen = deleteImagen