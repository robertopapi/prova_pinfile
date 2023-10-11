var subdirectory = "files";
var filename = "prova_pinfile.txt";

////////////////////////////////////////////////////////
/*
 * appdebug()
 *
 */
function appdebug()
{
 if (arguments.length < 1)
  document.getElementById("appdebug").value = "";
 else
 {
  for (var i = 0; i < arguments.length; i++)
   document.getElementById("appdebug").value = document.getElementById("appdebug").value+"\n"+arguments[i];
 }
}
////////////////////////////////////////////////////////

/*
 * removeFile()
 *
 */
function removeFile()
{
 appdebug("removeFile()");
 
 window.resolveLocalFileSystemURL
 (
  cordova.file.externalApplicationStorageDirectory,
  function (fsroot)
  {
   console.log('removeFile() file system open: ' + fsroot.name);
   appdebug('removeFile() file system open: ' + fsroot.name);
   fsroot.getDirectory
   (
    subdirectory,
    { create: false },
    function (fs) // onsuccess getDirectory
    {
     fs.getFile
     (
      filename,
      { create: false, exclusive: false },
      function (fileEntry) // onsuccess getFile
      {
       console.log("removeFile() fileEntry is file? " + fileEntry.isFile.toString());
       appdebug("removeFile() fileEntry is file? " + fileEntry.isFile.toString());
       appdebug("removeFile() fileEntry.name " + fileEntry.name.toString());
       appdebug("removeFile() fileEntry.fullPath " + fileEntry.fullPath.toString());
       fileEntry.remove
       (
        function () //onsuccess remove
        {
         console.log("removeFile() Successful file remove: " + this.result);
         appdebug("removeFile() Successful file remove: " + this.result);
        },
        function (error) // onerror remove
        {
         appdebug("ERROR - removeFile().remove - errorcode="+error.code);
        }
       );
      },
      function (error) // onerror  getFile
      {
       appdebug("ERROR - removeFile().getFile - errorcode="+error.code);
      }
     );
    },
    function (error) // onerror getDirectory
    {
     appdebug("ERROR - removeFile().getDirectory - errorcode="+error.code);
    }
   );
  },
  function (error)
  {
   appdebug("ERROR - removeFile().resolveLocalFileSystemURL - errorcode="+error.code);
  }
 );
}

/*
 * createFile()
 *
 */
function createFile()
{
 appdebug("createFile()");
 
 window.resolveLocalFileSystemURL
 (
  cordova.file.externalApplicationStorageDirectory,
  function (fsroot) // onsuccess resolveLocalFileSystemURL
  {
   console.log('createFile() file system open: ' + fsroot.name);
   appdebug('createFile() file system open: ' + fsroot.name);
   fsroot.getDirectory
   (
    subdirectory,
    { create: false },
    function (fs) // onsuccess getDirectory
    {
     fs.getFile
     (
      filename,
      { create: true, exclusive: false },
      function (fileEntry) // onsuccess getFile
      {
       console.log("createFile() fileEntry is file? " + fileEntry.isFile.toString());
       appdebug("createFile() fileEntry is file? " + fileEntry.isFile.toString());
       appdebug("createFile() fileEntry.name " + fileEntry.name.toString());
       appdebug("createFile() fileEntry.fullPath " + fileEntry.fullPath.toString());
       //writeFile(fileEntry, null);
       fileEntry.createWriter
       (
        function (fileWriter)
        {
         fileWriter.onwriteend = function() // onwriteend createWriter
                                 {
                                  console.log("createFile() Successful file write");
                                  appdebug("createFile() Successful file write");
                                  //readFile(fileEntry);
                                  fileEntry.file
                                  (
                                   function (file) // onsuccess onwriteend
                                   {
                                    var reader = new FileReader();
                                    reader.onloadend = function()
                                                       {
                                                        console.log("createFile() Successful file read: " + this.result);
                                                        appdebug("createFile() Successful file read: " + this.result);
                                                       };
                                    reader.readAsText(file);
                                   },
                                   function () // onerror onwriteend
                                   {
                                    appdebug("ERROR - createFile().readFile - errorcode="+error.code);
                                   }
                                  )
                                 };
         fileWriter.onerror = function (e)  // onerror createWriter
                              {
                               console.log("createFile() Failed file write: " + e.toString());
                               appdebug("createFile() Failed file write: " + e.toString());
                              };
         dataObj = new Blob(
                            ['- some file data - '],
                            { type: 'text/plain' }
                           );
         fileWriter.write(dataObj); // write data createWriter
        }
       );
      },
      function (error)  // onerror getFile
      {
       appdebug("ERROR - createFile().getFile - errorcode="+error.code);
      }
     );
    },
    function (error) // onerror getDirectory
    {
     appdebug("ERROR - createFile().getDirectory - errorcode="+error.code);
    }
   );
  },
  function (error) // onerror resolveLocalFileSystemURL
  {
   appdebug("ERROR - createFile().resolveLocalFileSystemURL - errorcode="+error.code);
  }
 );
}

/*
 * readFile()
 *
 */
function readFile()
{
 appdebug("readFile()");
 
 window.resolveLocalFileSystemURL
 (
  cordova.file.externalApplicationStorageDirectory,
  function (fsroot) // onsuccess resolveLocalFileSystemURL
  {
   console.log('readFile() file system open: ' + fsroot.name);
   appdebug('readFile() file system open: ' + fsroot.name);
   fsroot.getDirectory
   (
    subdirectory,
    { create: false },
    function (fs) // onsuccess getDirectory
    {
     fs.getFile
     (
      filename,
      { create: false, exclusive: false },
      function (fileEntry) // onsuccess getFile
      {
       console.log("readFile() fileEntry is file?" + fileEntry.isFile.toString());
       appdebug("readFile() fileEntry is file?" + fileEntry.isFile.toString());
       appdebug("readFile() fileEntry.name " + fileEntry.name.toString());
       appdebug("readFile() fileEntry.fullPath " + fileEntry.fullPath.toString());
       //readFile(fileEntry);
       fileEntry.file
       (
        function (file)
        {
         var reader = new FileReader();
         reader.onloadend = function()
                            {
                             console.log("readFile() Successful file read: " + this.result);
                             appdebug("readFile() Successful file read: " + this.result);
                            };
         reader.readAsText(file);
        },
        function (error) // onerror readFile.read
        {
         appdebug("ERROR - readFile().read - errorcode="+error.code);
        }
       );
      },
      function (error) // onerror getFile
      {
       appdebug("ERROR - readFile().getFile - errorcode="+error.code);
      }
     );
    },
    function (error) // onerror getDirectory
    {
     appdebug("ERROR - readFile().getDirectory - errorcode="+error.code);
    }
   );
  },
  function (error) // onerror resolveLocalFileSystemURL
  {
   appdebug("ERROR - readFile().resolveLocalFileSystemURL - errorcode="+error.code);
  }
 );
}