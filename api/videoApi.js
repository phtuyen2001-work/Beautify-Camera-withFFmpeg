import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

/**
 * videoApi.js
 */

const httpLink = `http://10.0.0.91:3000/api`

//To create a new FormData
const createFormData = (input, body = {}) => {
    const data = new FormData();

    data.append('input', {
        name: input.fileName,
        type: input.type,
        uri: Platform.OS === 'ios' ? input.uri.replace('file://', '') : input.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

//To ensure that the cache directory in the app exists
const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "output/")
    if (!dirInfo.exists) {
        console.log("Output directory doesnot exist, creating .....");
        await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "output/", { intermediates: true })
    }
}

//To delete all files in the caches when the resources are saved in the media library
const handleDeleteCache = (resource) => {
    if (resource) {
        FileSystem.deleteAsync(FileSystem.cacheDirectory + `output/${resource}`)
            .then(() => console.log("cache Deleted!"))
            .catch((err) => console.log(err))
    }
    else {
        FileSystem.deleteAsync(FileSystem.cacheDirectory + "output/")
            .then(() => console.log("cache Deleted!"))
            .catch((err) => console.log(err))
    }
}

//call the Upload api
async function handleUploadVideo(resource) {
    const result = await fetch(`${httpLink}/upload`, {
        method: "POST",
        body: createFormData(resource),
    })
        .then((res) => res.json())
        // .then((res) => console.log("UPLOAD ", res))
        .catch((err) => console.log(err))

    return result
}

//To call the Execute api
async function handleProcessFFmpeg(resource, filters) {
    // console.log("2", resource);
    await fetch(`${httpLink}/execute/${resource.resourceId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            resourceId: resource.resourceId,
            type: resource.type,
            command: `
            eq=contrast=${filters.contrast}
            :brightness=${filters.brightness}
            :saturation=${filters.saturation}
            :gamma=${filters.gamma}
            `,
        })
    })
        .then(res => res.json())
        .then(res => console.log("PROCESS ", res))
        .catch(err => console.log(err))
}

//To get the file with api
async function handleDownloadVideo(resource) {
    await ensureDirExists()

    const fileName = `${resource.resourceId}.${resource.type}`

    try {
        await FileSystem.downloadAsync(
            `http://10.0.0.91:3000/api/download/${fileName}`,
            FileSystem.cacheDirectory + `output/output_${fileName}`,
        ).then(async (result) => {
            // console.log('Finished downloading to ', result)
            FileSystem.getInfoAsync(result.uri)
                .then(async (r) => {
                    // console.log(r)
                    await MediaLibrary.saveToLibraryAsync(r.uri)
                })
                .then(() => handleDeleteCache())
                .catch(e => console.log(e))
        })
    }
    catch (err) {
        console.log(err);
    }
}

export {
    handleUploadVideo,
    handleProcessFFmpeg,
    handleDownloadVideo,
}