import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const MovieCard = (props) => {
  const { artist } = props;
  return (
    <Tbody>
      <Tr>
        <Td>
          {" "}
          <Image
            className=""
            maxW="120px"
            src={artist?.Poster}
            alt={artist?.Title}
          />
        </Td>
        <Td>
          <VStack align="self-start">
            <Text>{artist?.Title}</Text>
            <Text fontSize="sm">{artist?.Year}</Text>
          </VStack>
        </Td>
        <Td>
          <AddIcon w={6} h={6} />
        </Td>
      </Tr>
    </Tbody>
  );
};

export default MovieCard;
