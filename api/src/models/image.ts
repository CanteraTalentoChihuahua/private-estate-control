export default {
    getImageDupe: 'SELECT * FROM T_images WHERE image_name = @imageName',
    insertImage: `INSERT INTO T_Images (image_name, img)
    VALUES (@image_name, img)`
}