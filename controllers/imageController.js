import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import  {Jimp} from 'jimp'; // Keep this import // Correct import for ES module environment
import fs from 'fs';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Controller for image comparison
export const compareImage = async (req, res) => {
  try {
    // Path to the uploaded image
    const uploadedImagePath = req.file.path;
    console.log('Uploaded Image Path:', uploadedImagePath); // Log the uploaded image path

    // Check if the uploaded image exists
    if (!fs.existsSync(uploadedImagePath)) {
      console.error('Uploaded image not found at path:', uploadedImagePath);
      return res.status(404).json({ message: 'Uploaded image not found.' });
    }

    // Example path for the stored image to compare
    const databaseImagePath = join(__dirname, '../uploads/1729766387860.jpeg');
    console.log('Database Image Path:', databaseImagePath); // Log the database image path

    // Check if the database image exists before comparing
    if (!fs.existsSync(databaseImagePath)) {
      console.error('Stored image for comparison not found at path:', databaseImagePath);
      return res.status(404).json({ message: 'Stored image for comparison not found.' });
    }

    // Read both images using Jimp
    let uploadedImage, databaseImage;
    try {
      uploadedImage = await Jimp.read(uploadedImagePath);
      console.log('Uploaded image loaded successfully.');
    } catch (error) {
      console.error('Error reading uploaded image:', error.message);
      return res.status(500).json({ error: 'Error reading uploaded image.' });
    }

    try {
      databaseImage = await Jimp.read(databaseImagePath);
      console.log('Database image loaded successfully.');
    } catch (error) {
      console.error('Error reading database image:', error.message);
      return res.status(500).json({ error: 'Error reading database image.' });
    }

    // Ensure both images have the same dimensions
    if (uploadedImage.bitmap.width !== databaseImage.bitmap.width || uploadedImage.bitmap.height !== databaseImage.bitmap.height) {
      console.error('Images must have the same dimensions to compare.');
      return res.status(400).json({ message: 'Images must have the same dimensions to compare.' });
    }

    // Compare the images using Jimp.diff
    const diff = Jimp.diff(uploadedImage, databaseImage);
    const similarityThreshold = 0.15; // Adjust this threshold based on your requirements

    // Check if the images are similar based on the threshold
    if (diff.percent < similarityThreshold) {
      console.log('Similar image found with similarity:', diff.percent);
      return res.status(200).json({
        message: 'Similar image found!',
        similarity: diff.percent,
      });
    } else {
      console.log('No similar image found with similarity:', diff.percent);
      return res.status(404).json({
        message: 'No similar image found.',
        similarity: diff.percent,
      });
    }
  } catch (err) {
    console.error('Error during image comparison:', err);
    res.status(500).json({ error: 'Error comparing images' });
  }
};
