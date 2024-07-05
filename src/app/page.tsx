"use client";

import Card from "@/components/Card";
import { CharacterSchema, CollectionResponse, HTTPStatusCodes, postsSchema } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [characters, setCharacters] = useState<CharacterSchema[]>([]);
  const [postsError, setPostsError] = useState<Error>();
  const [charactersError, setCharactersError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const handleHttpStatus = (statusCode: HTTPStatusCodes) => {
    console.log(`Status code -> ${statusCode}`);
    
    return match(statusCode)
      .with(HTTPStatusCodes.OK, () => 'Request successful!')
      .with(HTTPStatusCodes.BAD_REQUEST, () => 'Bad request, please check your input.')
      .with(HTTPStatusCodes.UNAUTHORIZED, () => 'Unauthorized access, please login.')
      .with(HTTPStatusCodes.INTERNAL_SERVER_ERROR, () => 'Internal server error, please try again later.')
      .otherwise(() => 'Unknown error, please contact support.');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
        setPosts(response.data);
        handleHttpStatus(HTTPStatusCodes.OK)
        
      } catch (error) {
        if (error instanceof Error) {
          setPostsError(error);
        } else {
          setPostsError(new Error('An unknown error occurred'));
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response: CollectionResponse<CharacterSchema> = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(response.data.results);
        handleHttpStatus(HTTPStatusCodes.OK)

        console.log(response);
        
      } catch (error) {
        if (error instanceof Error) {
          setCharactersError(error);
        } else {
          setCharactersError(new Error('An unknown error occurred'));
        }
      }
      
    };

    fetchCharacters();
  }, []);

  // Record
  const characterData: Record<string, CharacterSchema> = {};

  characters.forEach((character) => {
    console.log(characterData[character.id] = character)
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-s gap-5 p-24">
      <h1 className="text-4xl font-bold">Typescript</h1>
      <details >
        <summary className="cursor-pointer text-xl font-bold bg-white text-black py-2 px-5 rounded-md w-[400px]">Posts</summary>
        {postsError ? (
          <p style={{ color: "red" }}>Error: {postsError.message}</p>
        ) : (
          <ul className="mt-5 flex flex-col gap-3 w-[400px]">
            {posts?.map((post: postsSchema) => (
              <Card title="Post">
                <p key={post.id} className="first-letter:capitalize italic text-center">{post.title}</p>
              </Card>
            ))}
          </ul>
        )}
      </details>
      
      <details>
        <summary className="cursor-pointer text-xl font-bold bg-white text-black py-2 px-5 rounded-md w-[400px]">Characters</summary>
        {charactersError ? (
          <p style={{ color: "red" }}>Error: {charactersError.message}</p>
        ) : (
          <ul className="mt-5 flex flex-col gap-3 w-[400px]">
            {characters?.map((character: CharacterSchema) => (
              <Card title="Character" key={character.id}>
                <div className="my- flex justify-center items-center gap-5">
                  <h2 className='text-xl font-bold'>{character.name}</h2>
                  <Image src={character.image} alt={character.name} width={35} height={35} className="rounded-full absolute right-8" />
                </div>
                <div className='flex gap-3'>
                    <p>{character.status}</p>
                    <p>{character.species}</p>
                    <p>{character.gender}</p>
                </div>
              </Card>
            ))}
          </ul>
        )}
      </details>
    </main>
  );
}