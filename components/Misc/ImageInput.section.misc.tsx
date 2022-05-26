import type { NextComponentType } from "next";

import { Box, Text } from "@chakra-ui/react";
import { useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { getBase64 } from "../../utils/helpers/getBase64";


const ImageInput: NextComponentType = () => {
  const [byteData, setByteData] = useState<any>();

  
  const onDrop = useCallback((acceptedFiles: any) => {
    const imageData = acceptedFiles[0];

    getBase64(imageData).then((data) => {
      console.log(data);
      setByteData(data);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      {byteData ? (
        <>
          <Box
            h="32"
            w="80%"
            p="1"
            rounded="lg"
            cursor="pointer"
            display="grid"
            placeItems="center"
            textAlign="center"
            overflow="hidden"
            bgSize="cover"
            style={{
              backgroundImage: `url(${byteData})`,
            }}
          ></Box>
        </>
      ) : (
        <Box
          h="32"
          w="80%"
          p="1"
          border="solid 2px"
          borderColor="gray.200"
          rounded="lg"
          cursor="pointer"
          display="grid"
          placeItems="center"
          textAlign="center"
        >
          <Text fontWeight="medium" textColor="gray.600" fontFamily="redHat">
            no image chosen
          </Text>
        </Box>
      )}
      <Box
        h="32"
        w="80%"
        px="12"
        py="8"
        border="dashed 2px"
        borderColor="gray.200"
        rounded="lg"
        _hover={{ bgColor: "gray.100" }}
        transition="all"
        transitionDuration="100ms"
        cursor="pointer"
        display="grid"
        placeItems="center"
        textAlign="center"
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" accept="image/*" />
        <Text fontWeight="medium" textColor="gray.600" fontFamily="redHat">
          drag n drop song cover here <br />
          or click to choose <br />
          (optional) (ratio: 2.5:1)
        </Text>
      </Box>
    </>
  );
};

export default ImageInput;
