'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Media } from '@/types'

export function useMedia(groupId: string) {
  const [mediaList, setMediaList] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!groupId) {
      setMediaList([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'media'),
      where('groupId', '==', groupId),
      orderBy('addedAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const media: Media[] = []
      snapshot.forEach((doc) => {
        media.push({ id: doc.id, ...doc.data() } as Media)
      })
      setMediaList(media)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [groupId])

  const addMedia = async (title: string, type: Media['type'], addedBy: string) => {
    try {
      const mediaData = {
        title,
        type,
        addedBy,
        groupId,
        watched: false,
        addedAt: new Date(),
      }
      
      await addDoc(collection(db, 'media'), mediaData)
    } catch (error) {
      console.error('Erro ao adicionar mídia:', error)
      throw error
    }
  }

  const toggleWatched = async (mediaId: string, watched: boolean) => {
    try {
      const mediaRef = doc(db, 'media', mediaId)
      await updateDoc(mediaRef, { watched })
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      throw error
    }
  }

  const removeMedia = async (mediaId: string) => {
    try {
      await deleteDoc(doc(db, 'media', mediaId))
    } catch (error) {
      console.error('Erro ao remover mídia:', error)
      throw error
    }
  }

  const getUnwatchedMedia = () => {
    return mediaList.filter(media => !media.watched)
  }

  const getRandomMedia = (): Media | null => {
    const unwatched = getUnwatchedMedia()
    if (unwatched.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * unwatched.length)
    return unwatched[randomIndex]
  }

  return {
    mediaList,
    loading,
    addMedia,
    toggleWatched,
    removeMedia,
    getUnwatchedMedia,
    getRandomMedia,
  }
}
