'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './todolist.module.css';
import Image from 'next/image';
import Header from '../components/Header';
import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';
import Board from '../moecules/Canvas';
import { CubeDiffculty, CubeDiffcultyKeys } from '../components/Cube';
import instance from '../instance';

const page = () => {
  
  const [todolist, setTodolist] = useState<[{ content: string, dateArr: string[], difficulty: CubeDiffcultyKeys }] | []>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 할 일 리스트 가져오기
  const getTodoList = useQuery({
    queryKey: ['todolist'],
    queryFn: async () => {
      const response = await instance({
        method: "get",
        url: 'schedule/view'
      });
      console.log(response)
      return await response.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  // const getLogout = useQuery({
  //   queryKey: ['logout'],
  //   queryFn: async () => {
  //     const response = await axios.get('http://localhost:4000/auth/logout', {
  //       withCredentials: true
  //     });
  //     console.log(response)
  //     return response;
  //   }
  // })

  // const logoutHandler = () => {
  //   console.log(getLogout);
  // }


  // 로딩
  useEffect(() => {
    const data = () => {
      try {
        setIsLoading(true);
        getTodoList.refetch();
      } catch (error) {
        console.log(error);
      } finally {
          setIsLoading(false)
      }
    }
    data();
  }, [])

  useEffect(()=>{
    console.log(todolist, 44)
    getTodoList.refetch();
  }, [todolist])

  // 할 일 리스트 뿌려주기
  useEffect(() => {
    if (getTodoList.isFetched && !isLoading) {
      const arr: [{id: number, content: string, dateArr: string[], difficulty: CubeDiffcultyKeys}] = [];
      getTodoList.data.map((el: any) => {
        switch(el.difficulty) {
          case "easy":
            arr.push({
              id: el.id,
              content: el.content,
              dateArr: el.dateArr,
              difficulty: CubeDiffculty.EASY
            })
            break;
          case "normal":
            arr.push({
              id: el.id,
              content: el.content,
              dateArr: el.dateArr,
              difficulty: CubeDiffculty.NORMAL
            })
            break;
          case "hard":
            arr.push({
              id: el.id,
              content: el.content,
              dateArr: el.dateArr,
              difficulty: CubeDiffculty.HARD
            })
            break;
        }
      })
      setTodolist(arr);
    }
  }, [getTodoList.data, isLoading, getTodoList.isFetchedAfterMount]) // 데이터 가져왔을 때 + 추가에서 취소 눌렀을 때

  // 로딩 될 때
  if (isLoading) {
    return <div>로딩중</div>
  }

  return (
    <>
      <div className='w-full flex flex-col justify-center'>
        <Header />
        <HeaderTab props={{
          main: 'border-2 border-b-0 font-bold',
          todo: 'border-b-2 text-gray-300 text-sm',
          complete: 'border-b-2 text-gray-300 text-sm'
        }} />
        <div className='w-full h-[88vh] overflow-hidden'>
          <Board todolist={todolist}/>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default page