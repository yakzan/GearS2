git rm --cached .sign/author-signature.xml 
git rm --cached .sign/signature1.xml 
git rm --cached .sign/.manifest.tmp
git update-index --assume-unchanged .sign/.manifest.tmp 
git update-index --assume-unchanged .sign/signature1.xml 
git update-index --assume-unchanged .sign/author-signature.xml 
echo ".manifest.tmp" >> .gitignore
echo "author-signature.xml" >> .gitignore
echo "signature1.xml" >> .gitignore
