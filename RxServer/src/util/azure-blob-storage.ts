import { BlobServiceClient } from "@azure/storage-blob";

export const getBlobServiceClient = (containerName: string) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env["AZURE_STORAGE_CONNECTION_STRING"]!
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  return containerClient;
}

export const getBlobClient = (containerName: string, blobName: string) => {
  const containerClient = getBlobServiceClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  return blockBlobClient;
}