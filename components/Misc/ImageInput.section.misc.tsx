import type { NextComponentType } from "next";

import { Box, Text, Button } from "@chakra-ui/react";
import { useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { getBase64 } from "../../utils/helpers/getBase64";
import { byteDataAtom } from "../../utils/helpers/atoms";
import { useRecoilState } from "recoil";

const ImageInput: NextComponentType = () => {
  const [byteData, setByteData] = useRecoilState(byteDataAtom);
  const [gradient, setGradient] = useState();

  const onDrop = useCallback((acceptedFiles: any) => {
    const imageData = acceptedFiles[0];
    // get the image name
    const imageName = imageData.name;

    getBase64(imageData).then((data) => {
      console.log(data);
      setByteData(data as string);
    });
  }, [setByteData]);

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
            bgImage={`url(${byteData})`}
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
      <Button
        rounded="full"
        fontFamily="redHat"
        fontWeight="600"
        px="6"
        _focus={{}}
        _active={{ transform: "scale(1)" }}
        _hover={{ transform: "scale(0.95)" }}
        bgGradient="linear(to-r, #ee0979, #ff6a00)"
        textColor="white"
        transition="all"
        transitionDuration="100ms"
        onClick={() => setByteData("https://picsum.photos/300/120")}
      >
        randomize
      </Button>
    </>
  );
};

export default ImageInput;
