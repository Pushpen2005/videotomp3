import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";


export async function uploadFile(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${file.filename}.mp3`;
    const outputPath = `uploads/${fileName}`;

    ffmpeg(file.path)
      .toFormat('mp3')
      .on('end', () => {
        fs.unlinkSync(file.path);

        return res.status(200).json({
          message: 'File converted successfully',
          mp3: fileName // ✅ FIXED
        });
      })
     .on('error', (error) => {
  console.error("🔥 UPLOAD FFMPEG ERROR:", error.message);
  return res.status(500).json({ error: 'Conversion failed' });
})
      .save(outputPath);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

export async function downloadFile(req, res) {
    try {
        const filename = req.params.filename;
        const filePath = `uploads/${filename}`;

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).json({ error: 'Failed to download file' });
            }
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        return res.status(500).json({ error: 'Failed to download file' });
    }
}   
