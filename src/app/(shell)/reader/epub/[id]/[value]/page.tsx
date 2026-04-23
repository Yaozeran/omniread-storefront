/* Copyright (c) 2026 Yao Zeran
 * 
 * The reader page. */


import type { EpubIdentifier } from "@/types/epub";



async function ReaderPage(
  { params }: Readonly<{ params : { id : string, value: string } }>
) {

  const identifier: EpubIdentifier = {
    id: params.id,
    value: params.value,
  }
  
  return (
    <div></div>
  )
}


export default ReaderPage;
